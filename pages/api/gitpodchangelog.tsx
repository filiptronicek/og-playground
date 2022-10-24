import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const font = fetch(new URL('../../assets/inter-latin-ext-700-normal.woff', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any) => {
  const {month, releaseDate} = {month: req.nextUrl.searchParams.get("month"), releaseDate: req.nextUrl.searchParams.get("date")};
  const fontData = await font;
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Inter",
          justifyContent: "center",
        }}
        tw="bg-gray-50"
      >
        <div tw="flex">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-9xl tracking-tight text-gray-900">
              <span tw="text-[#FFB45B]">The {month} changelog</span>
              <span tw="text-[#FFB45B]">{releaseDate}</span>

              <hr />
              <hr />
              <span tw="text-red-500 font-bold">A DRAFT 🚨</span>
              <span tw="text-4xl">
                Change this before merging, pretty please 🙏
              </span>
            </h2>
          </div>
        </div>
      </div>
    ),

    {
      width: 1472,
      height: 944,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}

