import { useEffect } from "react";

type AddressFields = {
  address: string;
  city: string;
  zipCode: string;
  country: string;
};

export function useGooglePlacesAutocomplete(
  inputRef: React.RefObject<HTMLInputElement>,
  onSelect: (fields: AddressFields) => void
) {
  useEffect(() => {
    if (!inputRef.current) return;

    const input = inputRef.current;
    const win = window as any;

    const init = () => {
      // Check for the classic Autocomplete constructor specifically
      if (!win.google?.maps?.places?.Autocomplete) {
        console.warn("Autocomplete not available:", win.google?.maps?.places);
        return;
      }

      const autocomplete = new win.google.maps.places.Autocomplete(input, {
        types: ["address"],
        fields: ["address_components", "formatted_address"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place?.address_components) return;

        const get = (type: string) =>
          place.address_components.find((c: any) => c.types.includes(type))?.long_name || "";
        const getShort = (type: string) =>
          place.address_components.find((c: any) => c.types.includes(type))?.short_name || "";

        onSelect({
          address: [get("street_number"), get("route")].filter(Boolean).join(" "),
          city: get("locality") || get("postal_town") || get("administrative_area_level_2"),
          zipCode: get("postal_code"),
          country: getShort("country"),
        });
      });
    };

    if (win.google?.maps?.places?.Autocomplete) {
      init();
    } else {
      window.addEventListener("google-maps-ready", init, { once: true });
    }

    return () => {
      window.removeEventListener("google-maps-ready", init);
    };
  }, [inputRef.current]); // re-run when the input mounts (step changes)
}