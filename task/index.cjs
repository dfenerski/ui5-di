module.exports = async function ({
    dependencies,
    log,
    options,
    taskUtil,
    workspace,
}) {
    // Get all possibly decorated resources
    const allResources = await workspace.byGlob('**/*.ts');
    // Check each one whether it uses DI
    for (const resource of allResources) {
        const contents = await resource.getString();
        if (contents.includes('Injectable()')) {
            // Retrieve constants from resource API
            const filePath = resource.getPath();
            const fileName = resource.getName();
            // Replace polymorphic decorations with explicit filename tokens. This way, after terser class name minification, the DI tokens will still identify the correct classes.
            const newContents = contents.replace(
                'Injectable()',
                `Injectable(Symbol.for('${fileName}'))`,
            );
            // Overwrite the file with the new contents
            await workspace.write(
                taskUtil.resourceFactory.createResource({
                    path: filePath,
                    string: newContents,
                }),
            );
        }
    }
};
