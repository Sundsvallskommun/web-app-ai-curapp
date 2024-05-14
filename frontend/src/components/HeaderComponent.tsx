import { cx, Image } from '@sk-web-gui/react';

export const HeaderComponent = () => {
  return (
    <div className="w-screen h-[9rem] sm:h-[10rem] md:h-[11rem] lg:h-[12rem] flex justify-center px-14">
      <div className="h-full w-full max-w-[1280px] flex justify-between items-center">
        <div
          className={cx(
            `w-[125px] sm:w-[145px] md:w-[165px] lg:w-[185px]`
            // `bg-red-300 xs:bg-green-400 sm:bg-blue-400 md:bg-orange-300 lg:bg-yellow-300`
          )}
        >
          <Image alt="Logo" src={`./${process.env.NEXT_PUBLIC_BRAND_LOGO}`} className="max-w-full max-h-[9rem]" />
        </div>
      </div>
    </div>
  );
};
