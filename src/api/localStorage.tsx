export const loadState = () => {
  try {
    const serialisedState = sessionStorage.getItem('state');
    if (serialisedState === null) {
      return undefined;
    }
    return JSON.parse(serialisedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serialisedState: string = JSON.stringify(state);
    sessionStorage.setItem('state', serialisedState);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
  }
};
