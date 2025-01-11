import moment from "moment";
import toast from "react-hot-toast";

interface ITextLimit {
  text: string;
  limit: number;
}
export const textLimit = ({ text, limit }: ITextLimit): string => {
  if (text.length > limit) {
    return text.slice(0, limit) + "...";
  }
  return text;
};

interface IDateRange {
  createdDt: Date | string;
}
export const dateRange = ({ createdDt }: IDateRange): string => {
  if (moment().diff(createdDt, "days") < 1) {
    if (moment().diff(createdDt, "hours") < 1) {
      return `${moment().diff(createdDt, "minutes")} minutes ago`;
    }
    return `${moment().diff(createdDt, "hour")} hours ago`;
  } else {
    return `${moment(createdDt).format("MMM DD, YYYY")}`;
  }
};

export const handleCopyLink = (link: string) => {
  navigator.clipboard.writeText(link);
  toast.success("Link copied to clipboard");
};
