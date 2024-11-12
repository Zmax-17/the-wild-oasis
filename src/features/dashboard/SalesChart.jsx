import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  eachDayOfInterval,
  format,
  isSameDay,
  subDays,
} from "date-fns";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    //     Inside the .map() function if you see we have the format(date, "MMM dd") function that formats the date into a string with the month abbreviation and day of the month.

    // bookings.filter((booking) => isSameDay(date, new Date(booking.created_at))) filters the bookings array to only include bookings that occurred on the same day as the current date in the iteration.

    // After the filter, we then apply the reduce method that sums up the totalPrice property of each booking that matches the current date, effectively calculating the total sales for that day. The initial value of the accumulator (acc) is 0.

    // Similarly, .reduce((acc, curr) => acc + curr.extrasPrice, 0) calculates the total sales of extras for that day.

    // The result is an array of objects where each object represents a date with its corresponding label (formatted date) and the total sales and extras sales for that day.
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) =>
          isSameDay(date, new Date(booking.created_at))
        )
        .reduce((acc, cur) => acc + cur.totalPrice, 0),

      extrasSales: bookings
        .filter((booking) =>
          isSameDay(date, new Date(booking.created_at))
        )
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
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
        Sales from {format(allDates.at(0), "MMM dd yyyy")}{" "}
        &mdash; {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer
        height={300}
        width="100%"
      >
        <AreaChart data={data}>
          {/* This display our label on XAxis */}
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          {/* This display our price step on YAxis */}
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          {/* This is decart grid, strokeDasharray change line grid to dashedd  */}
          <CartesianGrid strokeDasharray="4" />

          {/* This give us a current value on XAxis */}
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
            }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
