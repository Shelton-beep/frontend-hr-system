import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="m-6 bottom-0 right-0 left-0 mx-auto flex flex-col justify-center items-center">
      <span className="text-sm">
        &copy; Nssa {currentYear}. All rights reserved.
      </span>
      <span className="text-sm text-gray-700 font-extralight">
        designed by
        <Link
          target={"_blank"}
          className="hover:underline hover:text-green-700"
          href={"https://shelton-simbi.netlify.app/"}
        >
          Shelton Simbi
        </Link>
      </span>
    </footer>
  );
};

export default Footer;
