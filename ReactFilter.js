//Filter for Landing Page with filterOne and filterTwo Option
import React, { Component } from 'react';
import { Select, Row, Col } from 'antd';
import { AppContext } from './AppContext';
import * as myConstClass from '../fileWithConstants';
import '../AppStyle.css';

export class Filter extends Component {

    // This line below actually force this.context gets populated
    // with nearest Context Provider.
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            filterOne: [],
            filterTwo: [],
            filterOneId: myConstClass.DEFAULT_FILTERONE_ID,
            filterTwoId: myConstClass.DEFAULT_FILTERTWO_ID
        };


    }


    componentDidMount() {
        //initial load the main filter with the filterOne and filterTwo  options
        this.getFilters();

    }

    //Set state of filterTwo according to selected filter dropdown value.
    //passes filterTwo value as props to Main Page conbtaining the filter
    handleChangeFilterTwo = (filterTwoValue) => {

        this.setState({
            filterTwoId: filterTwoValue
        });
        this.props.onFilterTwo(filterTwoValue);

    };

    //Set state of filterOne according to selected filter dropdown value.
    //passes filterOne value as props to Main Page conbtaining the filter
    handleChangeFilterOne = (filterOneValue) => {
        this.setState({
            filterOneId: filterOneValue
        });
        this.props.onFilterOne(filterOneValue);
    };

    //function to populate the filter with all the filterOne and filterTwo  values
    //eg: filterOne: Christchurch filterTwo: 1
    getFilters = () => {
        let url;
        url = myConstClass.BASE_API_URL;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    filterOne: data[0].filterOne,
                    filterTwo: data[0].filterTwo
                });

            });
    }


    render() {

        //console.log(this.context);
        //Antd Select Option Definition
        const Option = Select.Option;
        let filterOne = this.state.filterOne;
        let filterTwo = this.state.filterTwo;
        let filterOneOption;
        if (filterOne) {
            let filterOneOptions = filterOne;
            //Populate the filter with all the filterOne values
            filterOneOption = filterOneOptions.map((item) => {
                return (

                    <Option value={item.id} key={item.id}>{item.name}</Option>
                );
            });

        }
        
        let filterTwoOption;
        if (filterTwo) {
            let filterTwoOptions = filterTwo;
            //Populate the filter with all the filterTwo values
            filterTwoOption = filterTwoOptions.map((item) => {
                return (

                    <Option value={item.id} key={item.name}>{item.name}</Option>
                );
            });

        }


        return (
            //Main Filter Structure
            <div>
                <Row className="filterRow">
                    <Col span={24}>

                        <div style={{ textAlign: 'center' }}>
                            <img src={require('../images/image.png')} alt="logo" />
                        </div>
                    </Col>
                </Row>
                <Row className="filterRow">
                    <Col span={24}>
                        <p>Please select your filterOne</p>
                        <Select value={this.context.filterOneKey}
                            mode="default"
                            className="filterSelect"
                            optionFilterProp="filterOne"
                            onChange={this.handleChangeFilterOne}
                            placeholder="Please select your filterOne">
                            {filterOneOption}
                        </Select>
                    </Col>
                </Row>
                <Row className="filterRow">
                    <Col span={24}>
                        <p>Please select your filterTwo</p>
                        <Select mode="default"
                            value={this.context.filterOneKey}
                            className="filterSelect"
                            optionFilterProp="filterTwo"
                            onChange={this.handleChangeFilterTwo}
                            placeholder="Please select your filterTwo">
                            {filterOneOption}
                        </Select>

                    </Col>
                </Row>
            </div>
        );
    }
}
