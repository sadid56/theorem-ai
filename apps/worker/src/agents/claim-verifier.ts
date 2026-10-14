export interface ApprovedFact {
  id: string;
  fieldName: string;
  value: string;
  approvalStatus: string;
}

export interface ClaimVerificationResult {
  valid: boolean;
  unverifiedClaims: string[];
  approvedMappings: Array<{ claim: string; factId: string }>;
}

export class ClaimVerifier {
  static verifyScriptClaims(
    claims: Array<{ claim: string; factId: string }>,
    facts: ApprovedFact[],
  ): ClaimVerificationResult {
    const approvedFactIds = new Set(
      facts
        .filter((f) => f.approvalStatus === "approved")
        .map((f) => f.id),
    );

    const unverifiedClaims: string[] = [];
    const approvedMappings: Array<{ claim: string; factId: string }> = [];

    for (const item of claims) {
      if (approvedFactIds.has(item.factId)) {
        approvedMappings.push(item);
      } else {
        unverifiedClaims.push(item.claim);
      }
    }

    return {
      valid: unverifiedClaims.length === 0,
      unverifiedClaims,
      approvedMappings,
    };
  }
}
