import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { faker } from "@faker-js/faker";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Income Statics",
		},
	},
};

const labels = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const data = {
	labels,
	datasets: [
		{
			label: "Income Statics",
			// data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
			data: [
				1554, 3452, 3453, 3444, 3445, 4563, 5557, 853, 2339, 3107, 1331, 7132,
			],
			backgroundColor: "rgba(234 ,179 ,8 ,.85)",
		},
	],
};
