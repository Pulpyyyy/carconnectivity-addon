"""Is a version listed on the PyPI simple index?

Reads the PEP 691 JSON of https://pypi.org/simple/<package>/ on stdin and exits
0 when the version given as argument is listed, 1 otherwise. The simple index is
what pip resolves against: the JSON API (pypi.org/pypi/<pkg>/<ver>/json) is
refreshed first, so a version published seconds earlier passes a JSON check and
then fails in pip with "No matching distribution found" (issue #165).

Versions are compared as versions, not as strings, so PyPI's normalisation of a
tag (0.1a1, 0.13, ...) is not read as "absent".
"""
import json
import sys

from packaging.version import InvalidVersion, Version

try:
    want = Version(sys.argv[1])
    listed = json.load(sys.stdin).get("versions", [])
except (IndexError, InvalidVersion, ValueError):
    sys.exit(1)

for raw in listed:
    try:
        if Version(raw) == want:
            sys.exit(0)
    except InvalidVersion:
        continue

sys.exit(1)
