import withViewModel from "../../../../utils/withViewModel";

import EditClientView from "./view";
import useEditClientViewModel from "./view.model";

export default withViewModel(EditClientView, useEditClientViewModel);
