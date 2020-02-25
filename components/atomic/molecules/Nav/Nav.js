import React from 'react';

import { MobileNav } from '../../organism/MobileNav';
import { DesktopNav } from '../../organism/DesktopNav';

export const Nav = () => (
  <>
    <DesktopNav />
    <MobileNav />
  </>
);
