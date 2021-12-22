import Ajv from 'ajv';
import * as Yaml from 'js-yaml';

export class YamlHelper {
  private ajv!: Ajv;
  private yamlContent!: string;
  private readonly validate!: any;

  constructor(ajv: Ajv,
              validate: any) {
    this.ajv = ajv;
    this.validate = validate;
  }

  public lintYamlString(yamlContent: string): boolean {
    this.yamlContent = yamlContent;

    this.polishYamlString();

    const yaml = Yaml.load(this.yamlContent);

    return this.validate(yaml);
  }

  private polishYamlString() {
    // Add EOF if not existing
    if (!this.yamlContent.endsWith('\n')) {
      this.yamlContent += '\n';
    }

    // Replace tabs with two spaces for js-yaml
    this.yamlContent = this.yamlContent.replace(/\t/g, '  ');
  }
}
