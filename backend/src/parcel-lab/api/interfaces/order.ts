import { ParcellabOrderBase } from './order-base';
import { ParcellabMultishop } from './multishop';
import { ParcellabNotifications } from './notifications';
import { ParcellabSpecialKeys } from './special-keys';
import { ParcellabOptionalKeys } from './optional-keys';

export interface ParcellabOrder
  extends ParcellabOrderBase,
    Partial<ParcellabMultishop>,
    Partial<ParcellabNotifications>,
    Partial<ParcellabSpecialKeys>,
    Partial<ParcellabOptionalKeys> {}
