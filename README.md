## GitHub Action to publish AWS Lambda layers

In first, you need to set secrets for you project

`Settings -> Secrets and variables -> Actions`

---
### Environments

`AWS_ACCESS_KEY_ID` - aws access key

`AWS_SECRET_ACCESS_KEY` - aws secret key.

`AWS_REGION` aws region. Default `us-east-1`.

---
### Required Inputs

`layer_name` Layer name.

`zip_file` zip file name or path

---
### Optional Inputs

`layer_desc` Layer description.

`arch` CompatibleArchitectures. Where valid values are with comma separated:
* x86_64
* arm64

`runtime` CompatibleRuntimes. Where valid values are with comma separated:

* nodejs
* nodejs4.3
* nodejs4.3-edge
* nodejs6.10
* nodejs8.10
* nodejs10.x
* nodejs12.x
* nodejs14.x
* nodejs16.x
* nodejs18.x
* java8
* java8.al2
* java11
* python2.7
* python3.6
* python3.7
* python3.8
* python3.9
* dotnetcore1.0
* dotnetcore2.0
* dotnetcore2.1
* dotnetcore3.1
* dotnet6
* go1.x
* ruby2.5
* ruby2.7
* provided
* provided.al2



## Example usage

```yaml
- name: Publish AWS Lambda layer
  uses: 1xtr/publish-layer-version@v1.0.0
  env:
    AWS_REGION: ${{ secrets.AWS_REGION }}
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  with:
    layer_name: FunctionName
    zip_file: path/to/file.zip
    layer_desc: "Some text description"
    arch: 'x86_64,arm64'
    runtime: 'nodejs16.x,nodejs18.x'
```
