import importlib
import sys

modules_to_check = [
    ("fastapi", "FastAPI"),
    ("uvicorn", "Uvicorn"),
    ("asyncio", "AsyncIO"),
]

def check_module(module_name, display_name):
    try:
        module = importlib.import_module(module_name)
        version = getattr(module, "__version__", "(version not found)")
        print(f"{display_name} is installed. Version: {version}")
    except ModuleNotFoundError:
        print(f"{display_name} is NOT installed.")

def check_python_version():
    if sys.version_info >= (3, 7):
        print(f"Python version is {sys.version.split()[0]}, which is compatible.")
    else:
        print("Python version is not compatible. FastAPI requires Python 3.7 or higher.")

if __name__ == "__main__":
    check_python_version()
    for module_name, display_name in modules_to_check:
        check_module(module_name, display_name)
