'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import UnAutherHeader from '@components/Common/UnAuthHeader';
import LandingBottom from '@components/Home/LandingBottom';
import LandingMain from '@components/Home/LandingMain';
import LandingTop from '@components/Home/LandingTop';
import { useRoot } from '@core/contexts/RootContexts';

const staggerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
  hidden: { opacity: 0 },
};

export default function Home() {
  const { user, dashboardid, refreshUser } = useRoot();
  const router = useRouter();

  const { ref: topRef, inView: topInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const { ref: mainRef, inView: mainInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const { ref: bottomRef, inView: bottomInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!user) return;

    refreshUser(user);

    if (dashboardid) {
      router.push(`/dashboard/${dashboardid}`);
    } else {
      router.push('/mydashboard');
    }
  }, [user, dashboardid, refreshUser, router]);

  if (user) {
    return null;
  }

  return (
    <>
      <UnAutherHeader />

      <motion.div
        ref={topRef}
        initial="hidden"
        animate={topInView ? 'visible' : 'hidden'}
        variants={staggerVariants}
      >
        <LandingTop />
      </motion.div>

      <motion.div
        ref={mainRef}
        initial="hidden"
        animate={mainInView ? 'visible' : 'hidden'}
        variants={staggerVariants}
      >
        <LandingMain />
      </motion.div>

      <motion.div
        ref={bottomRef}
        initial="hidden"
        animate={bottomInView ? 'visible' : 'hidden'}
        variants={staggerVariants}
      >
        <LandingBottom />
      </motion.div>
    </>
  );
}
