import _ from "lodash";
import cmgdAPI from "../apis/cmgdAPI";
import { ALL_COLUMNS } from "../stableVariables";
import {
    GET_CURRENT_TABLE,
    GET_COLUMNS_NAMES_TYPES,
    ADD_COLUMN,
    DELETE_COLUMN,
    UPDATE_COLUMN,
    GET_CURRENT_PAGE,
    GET_ALL_OPTIONS,
    GET_DEFAULT_COLUMNS_NAMES,
    GET_ROW_NUMBER_PER_PAGE,
    GET_CURRENT_DATA_NUMBER,
    GET_FILTER_DATE,
    GET_MODAL_STATUS,
    GET_MODAL_CONTENT,
    GET_LAST_PARAMETERS,
    BACK_COLUMN,
    GET_PARAMETERS_NUMBERS,
    GET_ALL_PREVIOUS_COMBINATIONS,
} from "./types";

export const getCurrentTable = () => async (dispatch, getState) => {
    const columnTypes = getState().columns;
    const date = getState().date;
    const page = getState().page;
    const count = getState().row;
    const cascading_filter = _.remove(
        Object.keys(getState().columns),
        (n) => n !== ALL_COLUMNS
    );

    const filter = {};

    for (const colomnName in getState().params) {
        if (columnTypes[colomnName] === "boxes") {
            filter[colomnName] = {
                in: getState().params[colomnName],
            };
        } else if (columnTypes[colomnName] === "ranges") {
            filter[colomnName] = {
                gte: getState().params[colomnName][0].toString(),
                lte: getState().params[colomnName][1].toString(),
            };
        }
    }

    const json = {
        page: page,
        count: count,
        timestamp: {
            lt: date,
        },
        cascading_filter: cascading_filter,
        filter: filter,
    };

    if (getState().modal_content === "no-data") {
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));

        await delay(3000);

        dispatch({
            type: GET_MODAL_STATUS,
            payload: false,
        });
        dispatch({
            type: GET_MODAL_CONTENT,
            payload: "",
        });
    }

    dispatch({
        type: GET_MODAL_CONTENT,
        payload: "get",
    });

    dispatch({
        type: GET_MODAL_STATUS,
        payload: true,
    });

    // request data for current page
    var currentData = await cmgdAPI.post("/api/production/search", json);

    // if the response data is empty
    if (currentData.data.total_number === 0) {
        console.log("before setting no-data");

        dispatch({
            type: GET_MODAL_CONTENT,
            payload: "no-data",
        });

        dispatch({
            type: GET_MODAL_STATUS,
            payload: true,
        });

        if (getState().last_params.params) {
            dispatch({
                type: BACK_COLUMN,
                payload: getState().last_params.params,
            });
        }

        if (getState().last_params.date) {
            dispatch({
                type: GET_FILTER_DATE,
                payload: getState().last_params.date,
            });
        }

        return;
    }

    // get current table data
    const currentTable = currentData.data.results;

    dispatch({
        type: GET_CURRENT_TABLE,
        payload: currentTable,
    });

    // get the number of data for each parameters
    const currentOptions = currentData.data.cascading_filter;
    const paramsToNums = {};

    for (const index in currentOptions) {
        const col = currentOptions[index].field;
        if (columnTypes[col] === "boxes") {
            const optionsWithNum = {};
            for (const eleIndex in currentOptions[index].values) {
                const name = currentOptions[index].values[eleIndex].name;
                const count = currentOptions[index].values[eleIndex].count;
                optionsWithNum[name] = count;
            }
            if (Object.keys(getState().options).length > 0) {
                for (const eleIndex in getState().options[col]) {
                    if (
                        !(getState().options[col][eleIndex] in optionsWithNum)
                    ) {
                        optionsWithNum[getState().options[col][eleIndex]] = 0;
                    }
                }
            }
            paramsToNums[col] = optionsWithNum;
        }
    }

    dispatch({
        type: GET_PARAMETERS_NUMBERS,
        payload: paramsToNums,
    });

    // get total data numbers now
    const total_number = currentData.data.total_number;

    dispatch({
        type: GET_CURRENT_DATA_NUMBER,
        payload: total_number,
    });

    dispatch({
        type: GET_MODAL_STATUS,
        payload: false,
    });

    dispatch({
        type: GET_MODAL_CONTENT,
        payload: "",
    });
};

export const getColumnsNamesAndTypes = () => async (dispatch) => {
    const allColumnsAndTypes = {
        disease: "boxes",
        gender: "boxes",
        BMI: "ranges",
        country: "boxes",
        age: "ranges",
        age_category: "boxes",
    };

    dispatch({
        type: GET_COLUMNS_NAMES_TYPES,
        payload: { [ALL_COLUMNS]: "boxes", ...allColumnsAndTypes },
    });
};

export const getAllOptions = () => async (dispatch, getState) => {
    const allNames = getState().columns;

    const allColumnsWithOptions = {};

    for (const columnName in allNames) {
        if (columnName !== ALL_COLUMNS) {
            if (allNames[columnName] === "boxes") {
                const currentOptions = await cmgdAPI.get(
                    `/api/production/fields/${columnName}`
                );
                allColumnsWithOptions[columnName] = _.map(
                    currentOptions.data,
                    "name"
                );
            } else if (allNames[columnName] === "ranges") {
                const currentOptions = await cmgdAPI.get(
                    `/api/production/fields/${columnName}`
                );
                const arrOfNum = [];
                _.map(currentOptions.data, "name").forEach((str) => {
                    arrOfNum.push(Number(str));
                });
                allColumnsWithOptions[columnName] = [
                    Math.min(...arrOfNum),
                    Math.max(...arrOfNum),
                ];
            }
        }
    }

    const allColumns = {
        [ALL_COLUMNS]: _.remove(
            Object.keys(getState().columns),
            (n) => n !== ALL_COLUMNS
        ),
    };

    dispatch({
        type: GET_ALL_OPTIONS,
        payload: {
            ...allColumns,
            ...allColumnsWithOptions,
        },
    });
};

export const addColumn = (columnName) => async (dispatch, getState) => {
    const newParameters = {
        ...getState().params,
        [columnName]: getState().options[columnName],
    };

    dispatch({
        type: ADD_COLUMN,
        payload: newParameters,
    });
};

export const deleteColumn = (columnName) => {
    return {
        type: DELETE_COLUMN,
        payload: columnName,
    };
};

export const updateColumn = (columnName, changeTo) => (dispatch, getState) => {
    const lastParameters = getState().params;
    dispatch({
        type: UPDATE_COLUMN,
        payload: {
            column: columnName,
            content: changeTo,
        },
    });
    dispatch({
        type: GET_LAST_PARAMETERS,
        payload: { params: lastParameters },
    });
};

export const getCurrentPage = (page) => {
    return {
        type: GET_CURRENT_PAGE,
        payload: page,
    };
};

export const getDefaultColumnsNames = () => async (dispatch) => {
    const realToShow = ["disease", "gender", "country", "age"];

    dispatch({
        type: GET_DEFAULT_COLUMNS_NAMES,
        payload: realToShow,
    });
};

export const getRowNumberPerPage = (num) => {
    return {
        type: GET_ROW_NUMBER_PER_PAGE,
        payload: num,
    };
};

export const getFilterDate = (date) => (dispatch, getState) => {
    dispatch({
        type: GET_LAST_PARAMETERS,
        payload: { ...getState().last_params, date: getState().date },
    });
    dispatch({
        type: GET_FILTER_DATE,
        payload: date,
    });
};

export const getModalStatus = (status) => {
    return {
        type: GET_MODAL_STATUS,
        payload: status,
    };
};

export const getModalContent = (content) => {
    return {
        type: GET_MODAL_CONTENT,
        payload: content,
    };
};

export const getAllPreviousCombinations = () => (dispatch) => {
    const allCombinations = [
        "First Combination",
        "Second Combination",
        "Thrid Combination",
    ];

    dispatch({
        type: GET_ALL_PREVIOUS_COMBINATIONS,
        payload: allCombinations,
    });
};
