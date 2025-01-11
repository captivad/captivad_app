import { NextRequest } from "next/server";
import { IPayloadUpdateOurService } from "../our-service.interface";
import { captivadPrisma } from "@/prisma/prisma";
import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import moment from "moment";
import { StatusContent } from "@/prisma/prisma/client";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serviceId = params.id as string;
    const body = (await req.json()) as IPayloadUpdateOurService;

    const servicedata = await captivadPrisma.service.findUnique({
      where: { uuid: serviceId, deleted_dt: null },
    });

    if (!servicedata) {
      return ResponseError(404, "Service not found");
    }

    servicedata.detail_title = body.detailTitle || servicedata.detail_title;
    servicedata.main_content = body.mainContatent || servicedata.main_content;
    servicedata.description_service =
      body.descriptionService || servicedata.description_service;
    servicedata.name_service = body.nameService || servicedata.name_service;
    servicedata.status = body.status || servicedata.status;

    await captivadPrisma.service.update({
      where: { uuid: serviceId },
      data: {
        ...servicedata,
        updated_dt: moment().toISOString(),
      },
    });

    return ResponseSuccess("Update service success");
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serviceId = params.id as string;
    const servicedata = await captivadPrisma.service.findUnique({
      where: { uuid: serviceId, deleted_dt: null },
    });

    if (!servicedata) {
      return ResponseError(404, "Service not found");
    }

    const findworksService = await captivadPrisma.portfolioService.findMany({
      where: { service_uuid: serviceId, deleted_dt: null },
    });

    await captivadPrisma.$transaction(async (tx) => {
      await tx.service.update({
        where: { uuid: serviceId },
        data: {
          status: StatusContent.draft,
          updated_dt: moment().toISOString(),
          deleted_dt: moment().toISOString(),
        },
      });

      if (findworksService.length > 0) {
        await tx.portfolioService.updateMany({
          where: { uuid: { in: findworksService.map((item) => item.uuid) } },
          data: {
            updated_dt: moment().toISOString(),
            deleted_dt: moment().toISOString(),
          },
        });
      }
    });

    return ResponseSuccess("Delete service success");
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
