import * as cdk from '@aws-cdk/core';
import * as cfn_inc from '@aws-cdk/cloudformation-include';

interface AddSecurityHeadersDemoStackProps extends cdk.StackProps {
    /**
     * Parent file path
     */
    readonly parentPath ? : string;

    /**
     * Child file path
     */
    readonly childPath ? : string;
}

export class AddSecurityHeadersDemoStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: AddSecurityHeadersDemoStackProps) {
        super(scope, id, props);
        this.templateOptions.description = `(SO0001) - Demo. Template version v1.0`;

        new cfn_inc.CfnInclude(this, 'ParentStack', {
            templateFile: props.parentPath!,
            loadNestedStacks: {
                'ChildStack': {
                    templateFile: props.childPath!
                }
            }
        });
    }
}
