import React from 'react';
import { Radio, Switch, Row, Col } from 'antd';
import _ from 'lodash';
import { ShotChart } from './ShotChart';
import { CountSlider } from './CountSlider';

export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        displayTooltip: true,
        chartType: "hexbin"
    }


    onCountSliderChange = (minCount) => {
        this.setState({ minCount });
    }

    onChartTypeChange = (e) => {
        this.setState({ chartType: e.target.value });
    }

    onTooltipChange = (displayTooltip) => {
        this.setState({ displayTooltip });
    }

    render() {
        const { minCount, displayTooltip, chartType } = this.state;

        return (
            <div className="data-view">
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={minCount}
                    displayTooltip={displayTooltip}
                    chartType={chartType}
                />

                {
                    chartType === "hexbin" ? (
                        <Row>
                            <Col offset={5}>
                                <CountSlider
                                    onChange={_.debounce(this.onCountSliderChange, 500)}
                                    value={minCount}
                                />
                            </Col>
                        </Row>
                    ) : null
                }

                <Row>
                    <Col offset={6} span={8}>
                        <Radio.Group value={chartType} onChange={this.onChartTypeChange}>
                            <Radio value="hexbin">Hexbin</Radio>
                            <Radio value="scatter">Scatter</Radio>
                        </Radio.Group>
                    </Col>
                    <Col span={4}>
                        <Switch
                            onChange={this.onTooltipChange}
                            checkedChildren="On"
                            unCheckedChildren="Off"
                            defaultChecked
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}