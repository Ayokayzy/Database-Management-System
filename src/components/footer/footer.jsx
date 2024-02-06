import React from "react";
import Brand from "../brand/brand";
import FootIcon from "../foot-icon/foot-icon";

import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#1408A0] py-16 text-white font-koho">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-4 text-white">
              <Brand white />
              <p className="font-bold text-2xl">DOXA</p>
            </div>
            <p className="text-gray-500 text-lg mt-4 font-medium">
              Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec
              mattis odio at.
            </p>
            <div className="flex gap-4 mt-4">
              <FootIcon />
              <FootIcon icon={<BsInstagram />} />
              <FootIcon icon={<FaLinkedinIn />} />
              <FootIcon icon={<FaTwitter />} />
              <FootIcon icon={<FaYoutube />} />
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid sm:grid-cols-3">
              <div>
                <h4 className="font-bold text-lg">Top 4 Category</h4>
                <ul className="mt-4 space-y-2">
                  <li>Development</li>
                  <li>Finance & Accounting</li>
                  <li>Design</li>
                  <li>Business</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg">Support</h4>
                <ul className="mt-4 space-y-2">
                  <li>Help Center</li>
                  <li>FAQs</li>
                  <li>Terms & Condition</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg">Support</h4>
                <ul className="mt-4 space-y-2">
                  <li>Help Center</li>
                  <li>FAQs</li>
                  <li>Terms & Condition</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-lg ml-auto mt-16">
          <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div class="relative">
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Subscribe to Our Newsletter"
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-[#BBE809] outline-none font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8">
          <p>
            @2023 <b>DOXA Database.</b> Copyright and all rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
