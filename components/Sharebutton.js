import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon
} from 'next-share';

export default function Sharebutton({ link }) {
  //   console.log(link);
  return (
    <div className="flex space-x-1">
      <FacebookShareButton url={link}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton url={link}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <TwitterShareButton url={link}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={link}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      

    </div>
  );
}
