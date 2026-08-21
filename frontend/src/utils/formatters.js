export const formatFullName = (
    firstName,
    lastName
) => {
    return [firstName, lastName]
        .filter(Boolean)
        .join(" ")
        .trim();
};

export const getInitials = (
    firstName,
    lastName
) => {
    const first =
        firstName?.trim()?.charAt(0) || "";

    const last =
        lastName?.trim()?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
};

export const formatCurrency = (
    amount,
    currency = "INR"
) => {
    if (
        amount === null ||
        amount === undefined ||
        amount === ""
    ) {
        return "₹0.00";
    }

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
    }).format(Number(amount));
};

export const capitalize = (value) => {
    if (!value) {
        return "";
    }

    return (
        value.charAt(0).toUpperCase() +
        value.slice(1).toLowerCase()
    );
};

export const formatEnumLabel = (value) => {
    if (!value) {
        return "";
    }

    return value
        .toString()
        .toLowerCase()
        .split("_")
        .map(capitalize)
        .join(" ");
};

export const truncateText = (
    text,
    maxLength = 100
) => {
    if (!text) {
        return "";
    }

    if (text.length <= maxLength) {
        return text;
    }

    return `${text.substring(
        0,
        maxLength
    )}...`;
};