import React from "react";
import { connect } from "react-redux";

import App from "./App";
import ModalCustom from "./components/Others/ModalCustom";

class FilterPage extends React.Component {
    render() {
        return (
            <div>
                <App />
                <ModalCustom
                    status={this.props.modal_status}
                    content={this.props.modal_content_type}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modal_status: state.modal_status,
        modal_content_type: state.modal_content,
    };
};

export default connect(mapStateToProps, {})(FilterPage);
