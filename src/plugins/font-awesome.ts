// src/plugins/font-awesome.ts
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBucket,
  faFill,
  faWater,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBucket, faFill, faWater, faRightLeft);

export { FontAwesomeIcon };
