import withViewModel from "@utils/withViewModel";

import CreateClientView from "./view";
import useCreateClientViewModel from "./view.model";

export default withViewModel(CreateClientView, useCreateClientViewModel);
