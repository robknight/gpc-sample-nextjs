import { deserializeProofResult } from "@/lib/serialize";
import { getTicketProofRequest } from "@/lib/ticketProof";
import { gpcVerify } from "@pcd/gpc";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
// @ts-ignore ffjavascript does not have types
import { getCurveFromName } from "ffjavascript";

const packagePath = path.join(
  process.cwd(),
  "node_modules/@pcd/proto-pod-gpc-artifacts"
);
const GPC_ARTIFACTS_PATH = packagePath;

export async function POST(req: NextRequest) {
  const { serializedProofResult } = await req.json();
  const { boundConfig, revealedClaims, proof } = deserializeProofResult(
    serializedProofResult
  );

  const request = getTicketProofRequest().getProofRequest();

  // Multi-threaded verification seems to be broken in NextJS, so we need to
  // initialize the curve in single-threaded mode.

  // @ts-ignore
  if (!globalThis.curve_bn128) {
    // @ts-ignore
    globalThis.curve_bn128 = getCurveFromName("bn128", { singleThread: true });
  }

  const res = await gpcVerify(
    proof,
    {
      ...request.proofConfig,
      circuitIdentifier: boundConfig.circuitIdentifier,
    },
    revealedClaims,
    GPC_ARTIFACTS_PATH
  );

  return NextResponse.json({ verified: res });
}
