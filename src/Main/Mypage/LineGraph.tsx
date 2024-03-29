import { ResponsiveLine } from '@nivo/line'

export interface LinePoint {
    x : string,
    y : number,
}

export interface LineGraphData {
    id: string,
    color: string,
    data : LinePoint[],
}

interface LineGraphProps {
    data: LineGraphData[];
    axis1 : string,
    axis2 : string,
}

const LineGraph = ({ data, axis1, axis2  }: LineGraphProps) => {
    return (
      <>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 1,
            tickPadding: 10,
            tickRotation: 0,
            legend: axis2,
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: 1,
            tickPadding: 1,
            tickRotation: 0,
            legend: axis1,
            legendOffset: -50,
            legendPosition: 'middle'
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          colors={({ id }) => id === 'reward' ? 'hsl(201.21546961325967, 73.87755102040816%, 48.03921568627451%)' : 'hsl(136.875, 79.3388429752066%, 52.54901960784314%)'}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </>
    );
  };
export default LineGraph;