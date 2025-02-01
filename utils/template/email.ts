export interface IPayloadTemplateOtp {
  fullname: string;
  otp: string;
  expiredTime: number;
}
const baseTemplate = (templateChild: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
        />
        <title>Document</title>
        <style>
        body {
            font-family: "Inter", sans-serif;
            width: 100%;
            height: 100%;
            /* background: #f0f0f0; */
            margin: 0;
        }
        table {
            width: 100%;
            height: 100%;
            border-collapse: collapse;
            background: white;
        }
        button {
            background: white;
            border: none;
            cursor: pointer;
        }
        .icon-sosmed {
            padding: 5px;
            height: 50px;
            width: 50px;
            overflow: hidden;
        }

        .icon {
            height: 20px;
            width: 20px;
            object-fit: contain;
        }

        #open-link {
            width: 217px;
            background-color: #093848;
            height: 41px;
            border-radius: 8px;
            color: white;
            margin-top: 20px;
        }
        </style>
    </head>
    <body>
        <div style="background: #f0f0f0; width: 100%; height: 100%">
        <table>
            <thead id="header">
            <tr>
                <th style="height: 63px; width: 100%; background: #1a1e20">
                <span style="height: 40px; width: 76px">
                    <img
                    style="height: 40px; width: 200px; object-fit: cover"
                    src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1737979022/LogoCaptivAd-02_1_uxnjeq.png"
                    alt=""
                    />
                </span>
                </th>
            </tr>
            </thead>
            <tbody id="body">
            <tr>
                <td style="padding: 20px; text-align: center">
                ${templateChild}
                </td>
            </tr>
            </tbody>
        </table>

        <table style="margin-top: 50px; background: none">
            <tbody id="body">
            <tr>
                <td style="padding: 20px; text-align: center">
                <div style="text-align: left; text-align: center">
                    <a
                    href="https://www.instagram.com"
                    target="_blank"
                    class="icon-sosmed"
                    ><img
                        class="icon"
                        src="https://backend.dev.engage.nolimit.id/images/db4f2ea6-3059-4e93-bc40-b4d498310d2f-icon-ig-1718703492712.png"
                    /></a>
                    <a
                    href="https://www.facebook.com"
                    target="_blank"
                    class="icon-sosmed"
                    ><img
                        class="icon"
                        src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1737978907/Social_Icons_2_kf8cyh.png"
                        alt=""
                    /></a>
                    <a href="https://x.com/" target="_blank" class="icon-sosmed"
                    ><img
                        class="icon"
                        src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1737978907/Social_Icons_1_gc5mxe.png"
                        alt=""
                    /></a>
                </div>
                <p>Copyright © 2024</p>
                <p>
                    jalan teluk langsa IV, jakarta timur, dki jakarta, Indonesia,
                    13440
                </p>
                <a href="https://captivad.co" style="font-weight: 600"
                    >Captivad</a
                >
                </td>
            </tr>
            </tbody>
        </table>
        </div>
    </body>
    </html>
    `;
};

export const templateGreating = () => {
  return baseTemplate(`
        <main>
            <span style="height: 210px; width: 330px">
            <img
                style="height: 210px; width: 330px; object-fit: cover"
                src="https://backend.prod.engage.nolimit.id/images/85284a9f-c497-4eb1-bd1f-0137e51c76f3-icon-email-1721026528712.png"
                alt=""
            />
            </span>
            <h2 style="width: 100%; text-align: center">Selamat Datang!</h2>
            <p style="text-align: justify">Halo pelanggan yang terhormat</p>
            <p style="text-align: justify">
            Terima kasih banyak telah terhubung dengan kami, pelanggan!
            Kami akan memastikan Anda mendapatkan informasi tentang
            pengumuman, promo, dan tawaran khusus apa pun.
            </p>
            <p style="text-align: justify">
            Beri tahu kami di alamat email kami atau nomor telepon kami
            jika Anda memerlukan sesuatu!
            </p>
        </main>
        `);
};
// export const templateGreating = () => `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
//         <link
//         href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
//         rel="stylesheet"
//         />
//         <title>Document</title>
//         <style>
//         body {
//             font-family: "Inter", sans-serif;
//             width: 100%;
//             height: 100%;
//             /* background: #f0f0f0; */
//             margin: 0;
//         }
//         table {
//             width: 100%;
//             height: 100%;
//             border-collapse: collapse;
//             background: white;
//         }
//         button {
//             background: white;
//             border: none;
//             cursor: pointer;
//         }
//         .icon-sosmed {
//             padding: 5px;
//             height: 50px;
//             width: 50px;
//             overflow: hidden;
//         }

//         .icon {
//             height: 20px;
//             width: 20px;
//             object-fit: contain;
//         }

//         #open-link {
//             width: 217px;
//             background-color: #093848;
//             height: 41px;
//             border-radius: 8px;
//             color: white;
//             margin-top: 20px;
//         }
//         </style>
//     </head>
//     <body>
//         <div style="background: #f0f0f0; width: 100%; height: 100%">
//         <table>
//             <thead id="header">
//             <tr>
//                 <th style="height: 63px; width: 100%; background: #1a1e20">
//                 <span style="height: 40px; width: 76px">
//                     <img
//                     style="height: 40px; width: 200px; object-fit: cover"
//                     src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1737979022/LogoCaptivAd-02_1_uxnjeq.png"
//                     alt=""
//                     />
//                 </span>
//                 </th>
//             </tr>
//             </thead>
//             <tbody id="body">
//             <tr>
//                 <td style="padding: 20px; text-align: center">
//                 <main>
//                     <span style="height: 210px; width: 330px">
//                     <img
//                         style="height: 210px; width: 330px; object-fit: cover"
//                         src="https://backend.prod.engage.nolimit.id/images/85284a9f-c497-4eb1-bd1f-0137e51c76f3-icon-email-1721026528712.png"
//                         alt=""
//                     />
//                     </span>
//                     <h2 style="width: 100%; text-align: center">Selamat Datang!</h2>
//                     <p style="text-align: justify">Halo pelanggan yang terhormat</p>
//                     <p style="text-align: justify">
//                     Terima kasih banyak telah terhubung dengan kami, pelanggan!
//                     Kami akan memastikan Anda mendapatkan informasi tentang
//                     pengumuman, promo, dan tawaran khusus apa pun.
//                     </p>
//                     <p style="text-align: justify">
//                     Beri tahu kami di alamat email kami atau nomor telepon kami
//                     jika Anda memerlukan sesuatu!
//                     </p>
//                 </main>
//                 </td>
//             </tr>
//             </tbody>
//         </table>

//         <table style="margin-top: 50px; background: none">
//             <tbody id="body">
//             <tr>
//                 <td style="padding: 20px; text-align: center">
//                 <div style="text-align: left; text-align: center">
//                     <a
//                     href="https://www.instagram.com"
//                     target="_blank"
//                     class="icon-sosmed"
//                     ><img
//                         class="icon"
//                         src="https://backend.dev.engage.nolimit.id/images/db4f2ea6-3059-4e93-bc40-b4d498310d2f-icon-ig-1718703492712.png"
//                     /></a>
//                     <a
//                     href="https://www.facebook.com"
//                     target="_blank"
//                     class="icon-sosmed"
//                     ><img
//                         class="icon"
//                         src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1737978907/Social_Icons_2_kf8cyh.png"
//                         alt=""
//                     /></a>
//                     <a href="https://x.com/" target="_blank" class="icon-sosmed"
//                     ><img
//                         class="icon"
//                         src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1737978907/Social_Icons_1_gc5mxe.png"
//                         alt=""
//                     /></a>
//                 </div>
//                 <p>Copyright © 2024</p>
//                 <p>
//                     jalan teluk langsa IV, jakarta timur, dki jakarta, Indonesia,
//                     13440
//                 </p>
//                 <a href="https://captivad.co" style="font-weight: 600"
//                     >Captivad</a
//                 >
//                 </td>
//             </tr>
//             </tbody>
//         </table>
//         </div>
//     </body>
//     </html>
// `;

export const templateOtp = ({
  fullname,
  otp,
  expiredTime,
}: IPayloadTemplateOtp) => {
  return baseTemplate(`
        <main>
            <span style="height: 210px; width: 330px">
                <img
                style="height: 210px; width: 330px; object-fit: cover"
                src="https://backend.prod.engage.nolimit.id/images/85284a9f-c497-4eb1-bd1f-0137e51c76f3-icon-email-1721026528712.png"
                alt=""
                />
            </span>
            <h2>OTP Verikasi</h2>
            <p>Hi ${fullname},</p>
            <p style="text-align: center">
                OTP ini diperlukan untuk melanjutkan permintaan Anda untuk melupakan Anda
                kata sandi.
            </p>
            <h1>${otp}</h1>
            <p
                style="
                text-align: center;
                margin-top: 50px;
                margin-bottom: 50px;
                "
            >
                OTP ini akan kadaluarsa ${expiredTime || "5"} menit.
            </p>
        </main>
        `);
};
