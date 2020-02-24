import React from 'react';

import { MobileNav } from '../../organism/MobileNav';
import { DesktopNav } from '../../organism/DesktopNap';

export const Nav = () => (
  <>
    <DesktopNav />
    <MobileNav />
  </>
);
