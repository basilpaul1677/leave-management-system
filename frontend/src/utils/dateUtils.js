const pad = (value) =>
    String(value).padStart(2, "0");

export const formatDate = (date) => {
    if (!date) {
        return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    const day = pad(parsedDate.getDate());

    const month = parsedDate.toLocaleString(
        "en-US",
        {
            month: "short",
        }
    );

    const year = parsedDate.getFullYear();

    return `${day} ${month} ${year}`;
};

export const formatDateTime = (date) => {
    if (!date) {
        return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return parsedDate.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const toApiDate = (date) => {
    if (!date) {
        return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    return [
        parsedDate.getFullYear(),
        pad(parsedDate.getMonth() + 1),
        pad(parsedDate.getDate()),
    ].join("-");
};

export const getToday = () => {
    return toApiDate(new Date());
};

export const isValidDate = (date) => {
    if (!date) {
        return false;
    }

    const parsedDate = new Date(date);

    return !Number.isNaN(parsedDate.getTime());
};

export const isDateBefore = (
    firstDate,
    secondDate
) => {
    const first = new Date(firstDate);
    const second = new Date(secondDate);

    return first < second;
};

export const isDateAfter = (
    firstDate,
    secondDate
) => {
    const first = new Date(firstDate);
    const second = new Date(secondDate);

    return first > second;
};

export const calculateLeaveDays = (
    startDate,
    endDate
) => {
    if (!startDate || !endDate) {
        return 0;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (
        Number.isNaN(start.getTime()) ||
        Number.isNaN(end.getTime())
    ) {
        return 0;
    }

    const difference =
        end.getTime() - start.getTime();

    return (
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        ) + 1
    );
};