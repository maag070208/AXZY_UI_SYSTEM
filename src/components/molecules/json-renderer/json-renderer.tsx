import React from "react";
import { ITJsonRendererProps, JsonComponentNode } from "./json-renderer.props";
import ITButton from "@/components/atoms/button/button";
import ITText from "@/components/atoms/text/text";
import ITCard from "@/components/molecules/card/card";
import ITFlex from "@/components/atoms/flex/flex";
import ITStack from "@/components/atoms/stack/stack";
import ITGrid from "@/components/atoms/grid/grid";
import ITAlert from "@/components/molecules/alert/alert";
import clsx from "clsx";

/**
 * Render UI from JSON schema using AXZY UI System components.
 *
 * @example
 * <ITJsonRenderer json={{ type: "button", props: { label: "Click me" } }} />
 *
 * @example
 * <ITJsonRenderer json={[
 *   { type: "alert", props: { variant: "info", title: "Info" }, children: "Hello" },
 *   { type: "card", props: { title: "Card" }, children: { type: "text", text: "Content" } }
 * ]} />
 */
export default function ITJsonRenderer({
  json,
  className,
}: ITJsonRendererProps) {
  const renderNode = (node: JsonComponentNode | React.ReactNode): React.ReactNode => {
    if (node == null || typeof node === "boolean") {
      return null;
    }

    if (typeof node === "string" || typeof node === "number") {
      return node;
    }

    if (React.isValidElement(node)) {
      return node;
    }

    if (Array.isArray(node)) {
      return node.map((child, idx) => (
        <React.Fragment key={idx}>{renderNode(child as any)}</React.Fragment>
      ));
    }

    // node is JsonComponentNode
    const { type, props = {}, children, text } = node as JsonComponentNode;

    const childContent = children !== undefined ? renderNode(children as any) : text;

    switch (type) {
      case "button":
        return <ITButton {...props}>{childContent}</ITButton>;
      case "text":
        return <ITText {...props}>{childContent}</ITText>;
      case "card":
        return <ITCard {...props}>{childContent}</ITCard>;
      case "flex":
        return <ITFlex {...props}>{childContent}</ITFlex>;
      case "stack":
        return <ITStack {...props}>{childContent}</ITStack>;
      case "grid":
        // ITGrid can be container or item; by default treat as container if has children layout
        return <ITGrid container {...props}>{childContent}</ITGrid>;
      case "alert":
        return <ITAlert {...props}>{childContent}</ITAlert>;
      case "div":
      default:
        return <div {...props}>{childContent}</div>;
    }
  };

  if (Array.isArray(json)) {
    return <div className={clsx(className)}>{json.map((n, idx) => <React.Fragment key={idx}>{renderNode(n)}</React.Fragment>)}</div>;
  }

  return <div className={clsx(className)}>{renderNode(json)}</div>;
}