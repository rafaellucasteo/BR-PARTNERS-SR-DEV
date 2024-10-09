import withViewModel from "../../../../utils/withViewModel";

import ClientListView from "./view";
import useClientListViewModel from "./view.model";

export default withViewModel(ClientListView, useClientListViewModel);
