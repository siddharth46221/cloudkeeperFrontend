const steps = [
  { 
    label: "A. Create an IAM Role", 
    title: "Create an IAM Role",
    path: "step1", 
    subtitle: "Create an IAM Role by following these steps" 
  },
  { 
    label: "B. Add Customer Managed Policies", 
    title: "Add Customer Managed Policies",
    path: "step2", 
    subtitle: "Attach required customer-managed policies" 
  },
  { 
    label: "C. Create CUR", 
    title: "Create CUR",
    path: "step3", 
    subtitle: "Create CUR in your AWS account" 
  },
];

const code= {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "MU1HX0RFRkFVTFQwMzM5NTZlYS1kMDE3LTRjYmQtYjY3ZS1jMGI4NWJjY2U4Yzk="
        }
      }
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ],

}

const code2= {"role":"CK-Tuner-Role-dev2"};


export {steps, code, code2}