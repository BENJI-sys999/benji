// Simple C++ calculator example
#include <iostream>

int main() {
    std::cout << "Simple calculator (enter: num op num, e.g. 4 + 3)\n";
    double a, b; char op;
    if (!(std::cin >> a >> op >> b)) {
        std::cout << "Invalid input\n";
        return 1;
    }
    double res = 0;
    switch (op) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '*': res = a * b; break;
        case '/': if (b != 0) res = a / b; else { std::cout << "Divide by zero\n"; return 1; } break;
        default: std::cout << "Unknown operator\n"; return 1;
    }
    std::cout << "Result: " << res << "\n";
    return 0;
}
