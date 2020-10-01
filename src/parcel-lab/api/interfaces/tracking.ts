import { ParcellabTrackingBase } from './tracking-base';
import { ParcellabMultishop } from './multishop';
import { ParcellabNotifications } from './notifications';
import { ParcellabSpecialKeys } from './special-keys';
import { ParcellabOptionalKeys } from './optional-keys';

export interface ParcellabTracking extends ParcellabTrackingBase, Partial<ParcellabMultishop>, Partial<ParcellabNotifications>, Partial<ParcellabSpecialKeys>, Partial<ParcellabOptionalKeys> {}
