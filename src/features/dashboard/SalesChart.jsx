import React from "react";
import styled from "styled-components";
import Heading from "../../styles/Heading";
import PropTypes from "prop-types";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../hooks/useDarkMode";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { formatDateRange } from "../../utils/format";

const StyledSalesChart = styled.div`
  grid-area: saleschart;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem 1rem;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  //计算日期区间
  const endDate = new Date();
  const startDate = subDays(endDate, numDays - 1);
  const allDates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });


  const data = allDates.map((date) => {
    return {
      date: format(date, "MMM dd"), //ex. 2025-07-15 => "Jul 15"
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.extraPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {formatDateRange(startDate, endDate)}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="date"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          {/* 设置网格线为虚线（4px实线+4px空白） */}
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          {/* 总销售额区域 */}
          <Area
            dataKey="totalSales"
            type="monotone" //使用平滑的曲线连接数据点
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales ($)"
          />
          {/* 附加价格区域 */}
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Total sales ($)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
SalesChart.propTypes = {
  bookings: PropTypes.array.isRequired,
  numDays: PropTypes.number.isRequired,
};

export default SalesChart;