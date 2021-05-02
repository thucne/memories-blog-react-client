const googleSuccess = (res) => {
    const tempResult = res?.profileObj;
    const tempToken = res?.tokenId;

    setShowGG(false);
    setOk(true);

    setSuccess({ message: 'Welcome to MEmories!' });

    try {
        dispatch(checkEmail(tempResult.email)).then((result) => {

            if (!result.message) {
                dispatch({ type: 'AUTH', data: { result: tempResult, token: tempToken } });

                setTimeout(() => {
                    setProgress(false);
                    if (setLinear) {
                        setLinear(false);
                    }
                    history.push('/');
                }, 200);

            } else {
                tempResult.incomplete = false;
                dispatch({ type: 'AUTH', data: { result: tempResult } });
                if (!doneCreate) {
                    setShowStepper(true);
                }
                setToken(tempToken);
                setResult(tempResult);
            }
        }).catch((err) => {
            tempResult.incomplete = false;
            dispatch({ type: 'AUTH', data: { result: tempResult } });
            if (!doneCreate) {
                setShowStepper(true);
            }
            setToken(tempToken);
            setResult(tempResult);
        });

    } catch (error) {
        console.log(error);
    }

}