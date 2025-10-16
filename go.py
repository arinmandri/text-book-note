import os
import yaml
from jinja2 import Environment, FileSystemLoader

def load_settings():
    if os.path.exists("settings.yml"):
        with open("settings.yml", "r", encoding="utf-8") as f:
            return yaml.safe_load(f)
    else:
        raise FileNotFoundError("settings.yml 파일이 없습니다.")

def make_output_dir_if_not_exists(settings):
    output_dir = settings["prod"]["dir"]
    os.makedirs(output_dir, exist_ok=True)

def main():
    settings = load_settings()
    make_output_dir_if_not_exists(settings)

    env = Environment(loader=FileSystemLoader("src"))

    for targetFilePath in settings["src"]["targets"]:
        template = env.get_template(targetFilePath)
        result = template.render({
            'settings': settings['skin']
        })

        with open(settings["prod"]["dir"] + '/' + targetFilePath, "w", encoding="utf-8") as f:
            f.write(result)

        print("내보냄: " + targetFilePath)

main()
