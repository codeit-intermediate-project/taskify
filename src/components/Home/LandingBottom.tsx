import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LandingBottom() {
  return (
    <motion.div className="flex flex-col items-center text-gray-300 md:h-[100px] md:flex-row md:items-center md:justify-around">
      <motion.div className="mb-[12px] md:mb-[0px]">
        <p>©codeit - 2023</p>
      </motion.div>
      <motion.div className="mb-[68px] flex gap-[20px] text-gray-300 md:mb-[0px]">
        <p>Privacy Policy</p>
        <p>FAQ</p>
      </motion.div>
      <motion.div className="mb-[90px] flex gap-[20px] md:mb-[0px]">
        <motion.a
          href="https://www.example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/email.png"
            alt="email link"
            width={18}
            height={18}
          />
        </motion.a>
        <motion.a
          href="https://www.facebook.com/?locale=ko_KR"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/facebook.png"
            alt="facebook link"
            width={18}
            height={18}
          />
        </motion.a>
        <motion.a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/instagram.png"
            alt="instagram link"
            width={18}
            height={18}
          />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
