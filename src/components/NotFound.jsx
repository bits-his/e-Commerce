import { globalColor } from "@/utils/Helper";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function NotFound() {
  const navigate = useNavigate()
  const goBack = ()=>navigate(-1)

  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl dark:text-primary-500" style={{color: globalColor.grpcolor1}}>
              404
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Something's missing.
            </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find the page you are looking for.{" "}
            </p>
            <div
              class="inline-flex bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:focus:ring-primary-900 my-3"
              style={{color: globalColor.grpcolor2, cursor: "pointer"}}
              onClick={goBack}
            >
              Back
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
