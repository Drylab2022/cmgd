import { combineReducers } from "redux";
import currentTable from "./currentTable";
import columnsNamesTypes from "./columnsNamesTypes";
import columnsCurrentParameters from "./columnsCurrentParameters";
import currentPage from "./currentPage";
import columnsOptions from "./columnsOptions";
import columnsShow from "./columnsShow";
import currentRowNumberPerPage from "./currentRowNumberPerPage";
import currentDataNumber from "./currentDataNumber";
import filterDate from "./filterDate";
import modalStatus from "./modalStatus";
import modalContent from "./modalContent";
import columnsLastParameters from "./columnsLastParameters";
import parametersNumbers from "./parametersNumbers";
import allCombinations from "./allPreviousCombinations";

export default combineReducers({
    table: currentTable,
    columns: columnsNamesTypes,
    params: columnsCurrentParameters,
    last_params: columnsLastParameters,
    params_to_nums: parametersNumbers,
    options: columnsOptions,
    show: columnsShow,
    row: currentRowNumberPerPage,
    page: currentPage,
    allrow: currentDataNumber,
    date: filterDate,
    modal_status: modalStatus,
    modal_content: modalContent,
    all_combinations: allCombinations,
});
