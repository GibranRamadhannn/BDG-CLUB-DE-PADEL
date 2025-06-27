export async function fetchTournaments() {
  try {
    const res = await fetch("/api/tournaments", {
      next: { revalidate: 60 },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch tournaments");

    return await res.json();
  } catch (error) {
    console.error("[fetchTournaments]", error);
    return [];
  }
}

export async function fetchTournamentById(id) {
  try {
    const res = await fetch(`/api/tournaments/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch tournament");
    return await res.json();
  } catch (error) {
    console.error("[fetchTournamentById]", error);
    return null;
  }
}
