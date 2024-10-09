"use client";
import React from "react";

export default function WithViewModel<ViewProps, ViewModelProps>(
  View: React.FunctionComponent<ViewProps & { children?: React.ReactNode }>,
  viewModel: (
    props: ViewModelProps
  ) => ViewProps & { children?: React.ReactNode }
) {
  const WithViewModelComponent = (props: ViewModelProps) =>
    React.createElement(View, viewModel(props));

  WithViewModelComponent.displayName = `WithViewModel(${
    View.displayName || View.name || "Component"
  })`;

  return WithViewModelComponent;
}
