import { useMemo } from "react";
import ITJsonRenderer from "@/components/molecules/json-renderer/json-renderer";
import { JsonComponentNode } from "@/components/molecules/json-renderer/json-renderer.props";

export function useJsonRender(json: JsonComponentNode | JsonComponentNode[]) {
  return useMemo(() => <ITJsonRenderer json={json} />, [json]);
}

export default useJsonRender;
