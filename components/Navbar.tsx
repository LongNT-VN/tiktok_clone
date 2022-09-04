import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src="/tiktok-logo.png"
            alt="TikTik"
            layout="responsive"
            width="100px"
            height="30px"
          />
        </div>
      </Link>
    </div>
  )
}

export default Navbar