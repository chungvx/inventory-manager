import { HeaderLink } from "shared/model/routing/route.model";
import { Theme } from "@sapo-presentation/sapo-ui-components";

export type ApplicationState = {
  header?: HeaderLink | string | null;
  loadingPage: boolean;
  sapoTheme: Theme;
};
