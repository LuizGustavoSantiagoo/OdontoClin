export function exibirHora(hours: number, minutes: number) {
    const safeHours = Math.floor(hours / 60);
    const safeMinutes = Number.isFinite(minutes) ? Math.max(0, Math.floor(minutes)) : 0;

    const hh = String(safeHours).padStart(2, "0");
    const mm = String(safeMinutes % 60).padStart(2, "0");

    return `${hh}:${mm}`;
}