import React from 'react';
import { Radio, Switch, Row, Col } from 'antd';
import _ from 'lodash';
import { ShotChart } from './ShotChart';
import { CountSlider } from './CountSlider';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        displayTooltip: true,
        chartType: "hexbin"
    }


    onCountSliderChange = (minCount) => {
        this.setState({ minCount: Number(minCount) || 2 });
    }

    onChartTypeChange = (e) => {
        this.setState({ chartType: e.target.value });
    }

    onTooltipChange = (displayTooltips) => {
        this.setState({ displayTooltips });
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
                <div className="filters">
                    {chartType === 'hexbin' ? 
                      <CountSlider
                        minCount={minCount}
                        onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
                      /> : null
                    }
                    <Row className="chart-type-radio">
                        <Col span={12} offset={3}>
                            <RadioGroup onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={6}>
                            Tooltip:{' '}
                            <Switch
                                checkedChildren="On"
                                unCheckedChildren="Off"
                                defaultChecked
                                onChange={this.onTooltipChange}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}