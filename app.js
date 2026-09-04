const byId = id => document.getElementById(id);
const value = id => { const raw = byId(id).value; return raw === "" ? null : Number(raw); };
const fmt = number => Number.isFinite(number) ? `${number > 0 ? "+" : ""}${number.toFixed(2)}` : "—";
const isAxis = axis => Number.isFinite(axis) && axis >= 0 && axis <= 180;
const card = (label, body) => `<div class="result"><small>${label}</small><strong>${body}</strong></div>`;

function multifocal() {
  const sphere = value("mf-sphere"), cylinder = value("mf-cylinder"), axis = value("mf-axis"), add = value("mf-add"), intAdd = value("mf-int-add");
  const shared = `${fmt(cylinder)} × ${isAxis(axis) ? axis + "°" : "—"}`;
  byId("multifocal-results").innerHTML = [
    card("Near", Number.isFinite(sphere) && Number.isFinite(add) ? `${fmt(sphere + add)} ${shared}` : "—"),
    card("Intermediate", Number.isFinite(sphere) && Number.isFinite(intAdd) ? `${fmt(sphere + intAdd)} ${shared}` : "—"),
    card("Distance", Number.isFinite(sphere) ? `${fmt(sphere)} ${shared}` : "—")
  ].join("");
}
function transpose() {
  const sphere = value("tr-sphere"), cylinder = value("tr-cylinder"), axis = value("tr-axis");
  const valid = Number.isFinite(sphere) && Number.isFinite(cylinder) && isAxis(axis);
  const newAxis = valid ? (axis <= 90 ? axis + 90 : axis - 90) : null;
  byId("transpose-results").innerHTML = [card("Transposed sphere", valid ? fmt(sphere + cylinder) : "—"), card("Transposed cylinder", valid ? fmt(-cylinder) : "—"), card("Transposed axis", valid ? `${newAxis}°` : "—")].join("");
}
function addCalculator() {
  const near = value("near-sphere"), distance = value("distance-sphere");
  const nearCyl = value("near-cylinder"), distCyl = value("distance-cylinder"), nearAxis = value("near-axis"), distAxis = value("distance-axis");
  let text = "Enter the two sphere values to calculate ADD.";
  if (Number.isFinite(near) && Number.isFinite(distance)) text = `Calculated ADD: ${fmt(near - distance)}`;
  if (Number.isFinite(nearCyl) && Number.isFinite(distCyl) && (nearCyl !== distCyl || nearAxis !== distAxis)) text += " — cylinder or axis differs; transpose to the same convention before using this result.";
  byId("add-result").textContent = text;
}
document.querySelectorAll("input, select").forEach(input => input.addEventListener("input", () => { multifocal(); transpose(); addCalculator(); }));
multifocal(); transpose(); addCalculator();
