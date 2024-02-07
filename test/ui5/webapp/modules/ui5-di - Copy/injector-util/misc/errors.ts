export const E_DRS_EXPLICIT_VALIDATION = new Error(
    'Dependency resolution strategy validation failed: explicit strategy requires at least one primitive token',
);
export const E_DRS_NON_EXPLICIT_VALIDATION = new Error(
    'Dependency resolution strategy validation failed: only explicit strategy can have primitive tokens',
);
