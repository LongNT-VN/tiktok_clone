import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Video } from '../types'
import { GoVerified } from "react-icons/go"

interface IProps {
    post: Video
}


const VideoCard = ({ post }: IProps) => {
    const [isHover, setIsHover] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    return (
        <div className="flex flex-col border-b-2 border-gray-200 pb-6">
            <div>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                    <div className="md:w-16 md:h-16 w-10 h-10">
                        <Link href="/">
                            <>
                                <Image
                                    width={62}
                                    height={62}
                                    className="rounded-full"
                                    src={post.postedBy.image}
                                    alt="profile photo"
                                    layout="responsive" />
                            </>
                        </Link>
                    </div>
                    <div>
                        <Link href="/">
                            <div className="flex item-center gap-2">
                                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                                    {post.postedBy.userName}
                                    <GoVerified className="text-blue-400 text-md" />
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="lg:ml-20 flex gap-4 relative">
                <div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className="rouded-3xl">
                    <Link href="/">
                        <video
                            loop
                            className="lg:w[600px] h-[300px] md:h-[530px] w-[200px] rouded-2xl cursor-pointer bg-gray-100"
                            src={post.video.asset.url}
                        >
                        </video>
                    </Link>
                    {isHover && (<div>
                        isHover
                    </div>)}
                </div>
            </div>
            {post.caption}
        </div>
    )
}

export default VideoCard